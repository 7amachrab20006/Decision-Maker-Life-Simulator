import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Phone, Mail, MessageSquare, Send, ArrowUpRight } from 'lucide-react';

export function Contact() {
  const developers = [
    {
      name: 'mohamed ben othmane',
      details: [
        {
          id: 'instagram-7m1',
          label: 'Instagram',
          value: '@7m1_person_numbah_92',
          link: 'https://instagram.com/7m1_person_numbah_92',
          icon: Instagram,
          color: 'hover:text-pink-500'
        },
        {
          id: 'phone-7m1',
          label: 'Direct Line',
          value: '46 986 361',
          link: 'tel:46986361',
          icon: Phone,
          color: 'hover:text-blue-500'
        }
      ]
    },
    {
      name: 'Lina Jaballah',
      details: [
        {
          id: 'instagram-lena',
          label: 'Instagram',
          value: '@lenajaballah',
          link: 'https://instagram.com/lenajaballah',
          icon: Instagram,
          color: 'hover:text-pink-500'
        },
        {
          id: 'phone-lena',
          label: 'Direct Line',
          value: '58 410 342',
          link: 'tel:58410342',
          icon: Phone,
          color: 'hover:text-green-500'
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-24 space-y-24">
      <header className="space-y-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-black uppercase tracking-[3px] text-primary"
        >
          Communication Hub
        </motion.div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-7xl font-black tracking-tighter"
        >
          Contact <span className="italic font-serif text-primary underline decoration-primary/20 underline-offset-12">Us.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-text-dim max-w-xl text-lg leading-relaxed font-light"
        >
          For scholarly inquiries, technical support, or partnership proposals, 
          reach out through our official channels.
        </motion.p>
      </header>

      <div className="space-y-20">
        {developers.map((dev, devIndex) => (
          <div key={dev.name} className="space-y-8">
            <motion.h2 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + devIndex * 0.2 }}
              className="text-2xl font-black tracking-tight flex items-center gap-4"
            >
              <span className="w-8 h-[2px] bg-primary"></span>
              {dev.name}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dev.details.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <motion.a
                    key={contact.id}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + devIndex * 0.2 + index * 0.1 }}
                    className="clean-card group flex flex-col gap-6 p-8 relative overflow-hidden"
                  >
                    <div className={`w-10 h-10 bg-bg-dark border border-border-dim rounded-lg flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-primary/40 transition-all duration-300 ${contact.color}`}>
                      <Icon size={20} />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-[3px] text-text-dim font-black">{contact.label}</span>
                      <div className="text-xl font-bold tracking-tight flex items-center gap-2">
                        {contact.value}
                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[80px] -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors"></div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="pt-12 border-t border-border-dim"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 grayscale group hover:grayscale-0 transition-all duration-700">
           <div className="text-[10px] font-black uppercase tracking-[5px]">Response Time: &lt; 24h</div>
           <div className="flex gap-12 font-serif italic text-sm">
              <span>Authentic</span>
              <span>Scholarly</span>
              <span>Reliable</span>
           </div>
        </div>
      </motion.section>
    </div>
  );
}
