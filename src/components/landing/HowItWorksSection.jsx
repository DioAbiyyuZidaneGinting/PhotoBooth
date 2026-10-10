import React from 'react';
import { LayoutGrid, Camera, Download, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Choose Your Frame',
      desc: 'Select a 3, 4, or 6-photo layout and pick your favorite aesthetic theme to match the vibe.',
      pill: 'Step 1 • Layout Selection',
      icon: <LayoutGrid size={15} />
    },
    {
      num: '02',
      title: 'Capture Your Moments',
      desc: 'Position yourself in the camera preview, follow the audio countdown, and pose for each slot.',
      pill: 'Step 2 • Multi-Slot Sequence',
      icon: <Camera size={15} />
    },
    {
      num: '03',
      title: 'Save and Share',
      desc: 'Our composite engine combines your pictures into high-definition strips ready to download and print.',
      pill: 'Step 3 • HD Composite & Print',
      icon: <Download size={15} />
    }
  ];

  return (
    <section id="how-it-works" className="section-how-it-works">
      <div className="section-container">
        <div className="section-header-center">
          <span className="section-label">SIMPLE WORKFLOW</span>
          <h2 className="section-title">Three Steps to Your Memory</h2>
          <p className="section-description">
            From your webcam to a physical or digital keepsake in less than two minutes.
          </p>
        </div>

        <div className="steps-timeline-row">
          {steps.map((step, idx) => (
            <div key={idx} className="step-card-item">
              <div className="step-number-badge">
                {step.num}
              </div>

              <div className="step-content-box">
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>

              <div className="step-mockup-pill">
                {step.icon}
                <span>{step.pill}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
