const functions = require('firebase-functions');
const axios = require('axios');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin
admin.initializeApp();

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.password
  }
});

// Email templates
const getClientEmailTemplate = (data) => `
Estimado/a ${data.name},

Gracias por contactar con El Costurero. Hemos recibido tu mensaje y nos pondremos en contacto contigo lo antes posible.

Detalles de tu consulta:
- Asunto: ${data.subject}
${data.serviceType ? `- Tipo de servicio: ${data.serviceType}` : ''}
${data.preferredDate ? `- Fecha preferida: ${data.preferredDate}` : ''}
${data.preferredTime ? `- Hora preferida: ${data.preferredTime}` : ''}
${data.orderNumber ? `- Número de pedido: ${data.orderNumber}` : ''}

Tu mensaje:
${data.message}

Si necesitas añadir información adicional, puedes responder directamente a este email.

Saludos cordiales,
El equipo de El Costurero
`;

const getBusinessEmailTemplate = (data) => `
Nuevo formulario de contacto recibido:

Información del cliente:
- Nombre: ${data.name}
- Email: ${data.email}
- Teléfono: ${data.phone || 'No proporcionado'}
- Asunto: ${data.subject}
${data.serviceType ? `- Tipo de servicio: ${data.serviceType}` : ''}
${data.preferredDate ? `- Fecha preferida: ${data.preferredDate}` : ''}
${data.preferredTime ? `- Hora preferida: ${data.preferredTime}` : ''}
${data.orderNumber ? `- Número de pedido: ${data.orderNumber}` : ''}

Mensaje:
${data.message}

ID del formulario: ${data.formId}
Accede al panel de control para gestionar esta solicitud.
`;

// Function to send emails
async function sendEmails(data, formId) {
  const businessEmail = functions.config().business.email;
  
  // Send confirmation email to client
  await transporter.sendMail({
    from: `"El Costurero" <${functions.config().email.user}>`,
    to: data.email,
    subject: 'Hemos recibido tu mensaje - El Costurero',
    text: getClientEmailTemplate(data)
  });

  // Send notification to business
  await transporter.sendMail({
    from: `"Sistema de Contacto" <${functions.config().email.user}>`,
    to: businessEmail,
    subject: `Nuevo formulario de contacto: ${data.subject}`,
    text: getBusinessEmailTemplate({ ...data, formId })
  });
}

// Función para obtener reseñas de Google Places
exports.getGoogleReviews = functions.https.onCall(async (data, context) => {
  try {
    const placeId = 'ChIJN_HNGi9PTg0RnvDP7f4PZyE'; // Tu Place ID
    const apiKey = 'AIzaSyBSvHI9wWQHxJyWPuKirPSG8SWcF4cRy_M'; // Tu API Key
    
    // URL de la API de Google Places con parámetros para español
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&language=es&key=${apiKey}`;
    
    const response = await axios.get(url);
    
    if (response.data.status === 'OK' && response.data.result.reviews) {
      console.log(`✅ Reseñas obtenidas: ${response.data.result.reviews.length}`);
      return {
        success: true,
        reviews: response.data.result.reviews
      };
    } else {
      console.warn('No se encontraron reseñas:', response.data.status);
      return {
        success: false,
        error: 'No se encontraron reseñas',
        status: response.data.status
      };
    }
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    return {
      success: false,
      error: error.message
    };
  }
});

// Función para obtener detalles del lugar
exports.getPlaceDetails = functions.https.onCall(async (data, context) => {
  try {
    const placeId = 'ChIJN_HNGi9PTg0RnvDP7f4PZyE'; // Tu Place ID
    const apiKey = 'AIzaSyBSvHI9wWQHxJyWPuKirPSG8SWcF4cRy_M'; // Tu API Key
    
    // URL de la API de Google Places con parámetros para español
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,formatted_address&language=es&key=${apiKey}`;
    
    const response = await axios.get(url);
    
    if (response.data.status === 'OK' && response.data.result) {
      console.log('✅ Detalles del lugar obtenidos');
      return {
        success: true,
        placeDetails: {
          name: response.data.result.name || 'El Costurero',
          rating: response.data.result.rating || 4.9,
          totalReviews: response.data.result.user_ratings_total || 0,
          address: response.data.result.formatted_address || 'Iparragirre Kalea, 1, 2ª a la izquierda, 48970 Basauri, Bizkaia'
        }
      };
    } else {
      console.warn('No se encontraron detalles del lugar:', response.data.status);
      return {
        success: false,
        error: 'No se encontraron detalles del lugar',
        status: response.data.status
      };
    }
  } catch (error) {
    console.error('Error al obtener detalles del lugar:', error);
    return {
      success: false,
      error: error.message
    };
  }
});

// Function to handle contact form submissions
exports.handleContactForm = functions.https.onCall(async (data, context) => {
  try {
    console.log('Received form data:', data);
    
    // Store in Firestore
    const db = admin.firestore();
    const formData = {
      ...data,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      status: 'new'
    };
    
    console.log('Attempting to save to Firestore...');
    const formRef = await db.collection('contactForms').add(formData);
    console.log('Saved to Firestore with ID:', formRef.id);

    // Send emails
    console.log('Sending emails...');
    await sendEmails(data, formRef.id);
    console.log('Emails sent successfully');

    return {
      success: true,
      formId: formRef.id,
      message: 'Formulario enviado correctamente'
    };
  } catch (error) {
    console.error('Error in handleContactForm:', error);
    
    // Try to send emails even if Firestore fails
    try {
      console.log('Attempting to send emails despite Firestore error...');
      await sendEmails(data, 'error-' + Date.now());
      console.log('Emails sent despite Firestore error');
    } catch (emailError) {
      console.error('Email sending also failed:', emailError);
    }
    
    throw new functions.https.HttpsError('internal', 'Error processing form submission: ' + error.message);
  }
}); 