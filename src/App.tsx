/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Wallet, 
  Briefcase, 
  Heart, 
  ArrowRight,
  CheckCircle2,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react';

type View = 'home' | 'about';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');

  const toggleView = (view: View) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-orange/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-teal/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="text-2xl font-display font-bold text-teal cursor-pointer flex items-center gap-2"
            onClick={() => toggleView('home')}
            id="logo"
          >
            Lif<span className="text-orange">Learning</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            <button 
              onClick={() => toggleView('home')}
              className={`hover:text-orange transition-colors ${currentView === 'home' ? 'text-orange underline underline-offset-8' : 'text-teal'}`}
              id="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => toggleView('about')}
              className={`hover:text-orange transition-colors ${currentView === 'about' ? 'text-orange underline underline-offset-8' : 'text-teal'}`}
              id="nav-about"
            >
              About
            </button>
            <button className="bg-teal text-cream px-6 py-2 rounded-full hover:bg-deep-teal transition-all shadow-lg hover:shadow-teal/20" id="nav-cta">
              Get Started
            </button>
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden text-teal"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            id="mobile-menu-toggle"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-20 left-0 right-0 bg-cream border-b border-teal/10 p-6 flex flex-col gap-6"
              id="mobile-menu"
            >
              <button 
                onClick={() => toggleView('home')}
                className={`text-xl font-medium ${currentView === 'home' ? 'text-orange' : 'text-teal'}`}
              >
                Home
              </button>
              <button 
                onClick={() => toggleView('about')}
                className={`text-xl font-medium ${currentView === 'about' ? 'text-orange' : 'text-teal'}`}
              >
                About
              </button>
              <button className="bg-teal text-cream px-6 py-3 rounded-full font-medium text-center">
                Get Started
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.section 
              key="home"
              id="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero Section */}
              <div className="relative py-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8 relative z-10">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-block bg-orange/10 text-orange px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide"
                    >
                      THE REAL WORLD 101
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl leading-tight text-deep-teal" id="hero-title">
                      Your life. <br />
                      <span className="text-teal italic">In focus.</span> <br />
                      Finally.
                    </h1>
                    <p className="text-xl md:text-2xl text-teal/80 max-w-xl leading-relaxed">
                      School taught you calculus. We teach you how to buy a house, negotiate your salary, and stop feeling like you're faking it.
                    </p>
                    
                    {/* Email Capture */}
                    <div className="bg-white p-2 rounded-2xl shadow-xl shadow-teal/5 flex flex-col sm:flex-row gap-2 max-w-lg border border-teal/5">
                      <input 
                        type="email" 
                        placeholder="Join the newsletter" 
                        className="flex-1 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/20"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email-input"
                      />
                      <button 
                        className="bg-orange text-white px-8 py-3 rounded-xl font-bold hover:bg-orange/90 transition-all flex items-center justify-center gap-2"
                        id="submit-email"
                      >
                        Get the Checklist <ArrowRight size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-teal/60 pl-2 flex items-center gap-2">
                       <CheckCircle2 size={16} /> Get the "Real Adult Checklist" immediately.
                    </p>
                  </div>
                  
                  {/* Visual Element */}
                  <div className="relative hidden lg:block">
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange/5 rounded-full blur-3xl" />
                    <div className="relative grid grid-cols-2 gap-4">
                      <div className="space-y-4 pt-12">
                        <div className="aspect-square bg-teal rounded-3xl overflow-hidden shadow-2xl rotate-3 flex items-center justify-center">
                           <Wallet className="text-cream w-20 h-20 opacity-20" />
                        </div>
                        <div className="aspect-[4/5] bg-orange rounded-3xl overflow-hidden shadow-2xl -rotate-2 flex items-center justify-center">
                           <Briefcase className="text-cream w-20 h-20 opacity-20" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="aspect-[3/4] bg-deep-teal rounded-3xl overflow-hidden shadow-2xl -rotate-3 flex items-center justify-center">
                            <Heart className="text-cream w-20 h-20 opacity-20" />
                        </div>
                        <div className="aspect-square bg-teal/20 rounded-3xl overflow-hidden shadow-xl border-2 border-teal/10 flex items-center justify-center backdrop-blur-xl">
                           <span className="text-teal font-display font-bold text-4xl">Gap.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Life Pillars Grid */}
              <div className="bg-white py-24 px-6 border-y border-teal/5">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl text-deep-teal">The Three Pillars</h2>
                    <p className="text-lg text-teal/60 max-w-2xl mx-auto">
                      Everything you need to master your 20s and 30s, broken down into actionable playbooks.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-8" id="pillars-grid">
                    {/* Pillar: Finance */}
                    <div className="group p-10 bg-cream rounded-[40px] border border-teal/5 hover:border-teal/20 transition-all hover:bg-white hover:shadow-2xl hover:shadow-teal/5">
                      <div className="w-16 h-16 bg-teal/10 rounded-2xl flex items-center justify-center text-teal mb-8 group-hover:scale-110 transition-transform">
                        <Wallet size={32} />
                      </div>
                      <h3 className="text-2xl mb-4">Finance</h3>
                      <p className="text-teal/70 leading-relaxed">
                        Budgeting for people who hate spreadsheets. High-yield savings, index funds, and credit score hacks that actually work.
                      </p>
                    </div>

                    {/* Pillar: Career */}
                    <div className="group p-10 bg-cream rounded-[40px] border border-teal/5 hover:border-teal/20 transition-all hover:bg-white hover:shadow-2xl hover:shadow-teal/5">
                      <div className="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center text-orange mb-8 group-hover:scale-110 transition-transform">
                        <Briefcase size={32} />
                      </div>
                      <h3 className="text-2xl mb-4">Career</h3>
                      <p className="text-teal/70 leading-relaxed">
                        The art of the interview. How to ghost-write your own promotion and navigate office politics without losing your soul.
                      </p>
                    </div>

                    {/* Pillar: Lifestyle */}
                    <div className="group p-10 bg-cream rounded-[40px] border border-teal/5 hover:border-teal/20 transition-all hover:bg-white hover:shadow-2xl hover:shadow-teal/5">
                      <div className="w-16 h-16 bg-deep-teal/10 rounded-2xl flex items-center justify-center text-deep-teal mb-8 group-hover:scale-110 transition-transform">
                        <Heart size={32} />
                      </div>
                      <h3 className="text-2xl mb-4">Lifestyle</h3>
                      <p className="text-teal/70 leading-relaxed">
                        Healthy habits for busy people. Finding a therapist, decorating your first real apartment, and building adult friendships.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          ) : (
            <motion.section 
              key="about" 
              id="about"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="py-20 px-6"
            >
              <div className="max-w-4xl mx-auto">
                <div className="space-y-12">
                  <div className="space-y-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-block bg-teal/10 text-teal px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide"
                    >
                      THE STORY
                    </motion.div>
                    <h2 className="text-5xl md:text-6xl text-deep-teal leading-tight" id="about-title">
                      Bridging the <br />
                      <span className="adulting-gap-text">Adulting Gap.</span>
                    </h2>
                  </div>

                  <div className="prose prose-xl prose-teal text-teal/80 space-y-8 leading-relaxed">
                    <p className="text-2xl font-medium text-deep-teal italic">
                      "I spent my 22nd birthday in Chicago with exactly $4.50 in my bank account and a stack of bills I didn't understand."
                    </p>
                    
                    <p>
                      Growing up in Chicago taught me grit, but it didn't teach me how a 401(k) works. After college, I hit what I call the **Adulting Gap**—that terrifying space between graduation and actually knowing what you're doing.
                    </p>
                    
                    <div className="bg-orange/5 border-l-4 border-orange p-8 rounded-r-3xl my-12">
                      <p className="text-orange font-bold text-3xl mb-4">$600 per two weeks.</p>
                      <p className="text-deep-teal/80 m-0">
                        That was my survival budget. I was juggling a entry-level job and trying to figure out why insurance deductibles felt like a scam. I realized my friends were all faking it too. No one had actually taught us how to be adults.
                      </p>
                    </div>

                    <p>
                      LifLearning was born out of that struggle. It’s the "cool older friend" advice I wish I had. The one who tells you which bank account to open, how to stand up for yourself in a performance review, and how to cook something other than frozen pizza.
                    </p>

                    <h3 className="text-3xl text-deep-teal font-display mt-16 mb-6">Our Mission</h3>
                    <p>
                      Our mission is simple: To provide the practical education the system forgot. We’re here to help you move from surviving to thriving, one life pillar at a time.
                    </p>
                  </div>
                  
                  <div className="pt-12 border-t border-teal/10 flex flex-col md:flex-row items-center gap-8">
                     <div className="w-24 h-24 bg-teal rounded-full overflow-hidden flex-shrink-0 grayscale">
                        {/* Avatar placeholder */}
                        <div className="w-full h-full bg-gradient-to-br from-teal to-deep-teal flex items-center justify-center text-cream font-bold text-xl">LL</div>
                     </div>
                     <div>
                        <p className="text-xl font-bold text-deep-teal mb-1">Jordan Wells</p>
                        <p className="text-teal/60">Founder, LifLearning</p>
                     </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-deep-teal text-cream py-20 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="space-y-6 md:col-span-2">
            <div className="text-3xl font-display font-bold">
              Lif<span className="text-orange">Learning</span>
            </div>
            <p className="text-cream/60 max-w-xs leading-relaxed text-lg">
              Empowering the next generation to bridge the gap and live intentionally.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange transition-colors"><Instagram size={20} /></a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange transition-colors"><Twitter size={20} /></a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-bold text-orange tracking-widest uppercase text-sm">Navigation</h4>
            <ul className="space-y-4 text-cream/70">
              <li><button onClick={() => toggleView('home')} className="hover:text-white">Home</button></li>
              <li><button onClick={() => toggleView('about')} className="hover:text-white">About</button></li>
              <li><a href="#" className="hover:text-white">The Blog</a></li>
              <li><a href="#" className="hover:text-white">Resources</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-orange tracking-widest uppercase text-sm">Connect</h4>
            <ul className="space-y-4 text-cream/70">
              <li><a href="mailto:hello@liflearning.com" className="hover:text-white">hello@liflearning.com</a></li>
              <li><a href="#" className="hover:text-white">Newsletter</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-cream/30 text-sm">
          &copy; {new Date().getFullYear()} LifLearning. All rights reserved. Built with love (and grit).
        </div>
      </footer>
    </div>
  );
}
