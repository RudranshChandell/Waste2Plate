import React from 'react';
import { UserPlus, MailCheck, Bell, MapPin } from 'lucide-react';

const Extension = () => {
  const steps = [
    {
      title: "SIGN UP",
      description: "Whether you're a student, a professional, or just someone who cares about reducing food waste, join us and save food.",
      icon: <UserPlus className="w-8 h-8 text-orange-400" />
    },
    {
      title: "VERIFY EMAILS",
      description: "Check your inbox to confirm your email and activate your account. Once verified, you'll start receiving updates on available free food near you.",
      icon: <MailCheck className="w-8 h-8 text-purple-400" />
    },
    {
      title: "RECEIVE ALERTS",
      description: "Set up email and mobile notifications to get real-time updates on available free food in your area.",
      icon: <Bell className="w-8 h-8 text-blue-400" />
    },
    {
      title: "PICKUP FOOD",
      description: "End food waste by picking up free food at or by collecting surplus food from participating locations, events, and businesses.",
      icon: <MapPin className="w-8 h-8 text-green-400" />
    }
  ];

  return (
    <div className="w-full">
      {/* Main quote */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-200 to-orange-100">
          "You hate food waste. So do we. <br />
          <span className="text-orange-500">Let's fix it together.</span>"
        </h2>
      </div>

      {/* Four steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {steps.map((step, index) => (
          <div key={index} className="glass-card p-6 flex flex-col items-center text-center hover:bg-white/10 transition-colors duration-300">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {step.icon}
            </div>
            <h3 className="font-bold text-white mb-3 text-lg tracking-wider">{step.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="inline-block p-[2px] rounded-full bg-gradient-to-r from-orange-500 to-red-500">
          <div className="px-10 py-4 bg-[#0a0a0a] rounded-full">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
              HELP SAVE FOOD TODAY
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Extension;