import { Toaster, toast } from 'sonner';
import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

export default function ContactForm() {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    const serviceId = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;

    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          toast.success('Mensaje enviado correctamente');
          form.current.reset();
        },
        (error) => {
          console.error('FAILED...', error);
          toast.error('Hubo un error al enviar el mensaje');
        }
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-white dark:bg-gray-950">
      {/* Componente necesario para que se vean las notificaciones */}
      <Toaster position="bottom-right" richColors />

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Empecemos a trabajar juntos
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            ¿Tienes algún proyecto en mente o simplemente quieres saludar? Rellena
            el formulario y te contestaré lo antes posible.
          </p>
        </div>

        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="user_name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Nombre
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name" // Asegúrate de que coincida con tu plantilla de EmailJS
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white outline-none transition-all"
                placeholder="Tu nombre"
                required
              />
            </div>
            <div>
              <label
                htmlFor="user_email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white outline-none transition-all"
                placeholder="tucorreo@ejemplo.com"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white outline-none transition-all resize-none"
              placeholder="Cuéntame sobre tu proyecto..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
        </form>
      </div>
    </section>
  );
}