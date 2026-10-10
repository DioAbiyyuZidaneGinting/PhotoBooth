import React from 'react';
import { LayoutGrid, Camera, Download } from 'lucide-react';
import { ZigzagUnderline, RotatingStamp, RetroSpark } from './Doodles';

export default function HowItWorksBand() {
  const steps = [
    {
      num: '01',
      title: 'Choose Your Frame',
      desc: 'Browse our collection of 3, 4, and 6-photo layouts. Select the design that matches your aesthetic.',
      pill: 'Layout & Slot Selection',
      icon: <LayoutGrid size={15} />
    },
    {
      num: '02',
      title: 'Capture Your Moments',
      desc: 'Position yourself in front of your webcam, listen for the countdown beeps, and strike a pose for every slot.',
      pill: 'Synchronized Countdown',
      icon: <Camera size={15} />
    },
    {
      num: '03',
      title: 'Save and Share',
      desc: 'Our engine renders your multi-corner composite with high-resolution clarity, ready to download or print.',
      pill: 'High-Res Composite & Print',
      icon: <Download size={15} />
    }
  ];

  return (
    <section id="how-it-works" className="v2-band-how-it-works">
      <div className="v2-steps-container">
        {/* Header with Zigzag Stroke */}
        <div className="v2-steps-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RetroSpark size={16} color="#F2B71F" />
            <span className="v2-section-label-yellow">HOW IT WORKS</span>
          </div>

          <h2 className="v2-heading-serif-white">
            Three steps to your memory
          </h2>

          <div style={{ marginTop: '0.6rem' }}>
            <ZigzagUnderline color="#F2B71F" width={220} height={18} />
          </div>
        </div>

        {/* 3 Columns Separated by Thin Lines */}
        <div className="v2-steps-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="v2-step-col">
              <span className="v2-step-num">{step.num}</span>
              <h3 className="v2-step-title">{step.title}</h3>
              <p className="v2-step-desc">{step.desc}</p>
              
              <div className="v2-step-mini-mockup">
                {step.icon}
                <span>{step.pill}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Rotating Circular Stamp in Bottom Right */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2.5rem' }}>
          <RotatingStamp
            text="MEMORIES • FRAMES • MOMENTS •"
            size={105}
            bg="#F2B71F"
            textColor="#111111"
            centerIcon="✦"
          />
        </div>
      </div>
    </section>
  );
}
