// Archivo: src/services/email.service.js
const nodemailer = require('nodemailer');

// 1. Configuración del Transporte (Usando las variables del .env)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER, 
    pass: process.env.MAIL_PASS 
  }
});

// 2. Función reutilizable para enviar correos
const enviarCorreoVerificacion = async (emailDestino, codigo) => {
  try {
    const info = await transporter.sendMail({
      from: `"Ferretería Ferrito 🛠️" <${process.env.MAIL_USER}>`,
      to: emailDestino,
      subject: '🔐 Código de Verificación - Ferrito',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FF6600; text-align: center;">Bienvenido a Ferrito</h2>
          <p>Para completar tu registro, ingresa el siguiente código en la aplicación:</p>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; letter-spacing: 5px; font-weight: bold; border-radius: 5px;">
            ${codigo}
          </div>
          <p style="font-size: 12px; color: #888; text-align: center; margin-top: 20px;">Este código expira en 10 minutos.</p>
        </div>
      `
    });
    console.log(`✅ Correo enviado a ${emailDestino}: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`❌ Error enviando correo:`, error);
    return false;
  }
};

module.exports = { enviarCorreoVerificacion };