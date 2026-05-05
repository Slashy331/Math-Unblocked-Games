/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, X, Search, Info, Calculator, FileText, LayoutGrid } from 'lucide-react';
import gamesData from './games.json';

interface Game {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  category: string;
}

export default function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = gamesData.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200 py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setSelectedGame(null)}
          >
            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Calculator className="w-5 h-5 text-blue-600" />
            </div>
            <h1 className="font-display text-xl tracking-tight text-slate-900">
              Math<span className="text-blue-600 font-bold">Flow</span> Hub
            </h1>
          </div>

          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search learning modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-transparent rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors hidden md:inline">Curriculum</button>
            <button className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors hidden md:inline">Theorems</button>
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 text-xs font-bold ring-2 ring-white">JS</div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-6 sm:p-10 max-w-7xl mx-auto w-full">
        {selectedGame ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Module Header */}
            <div className="flex items-center justify-between">
              <div>
                <nav className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
                  <span className="hover:text-blue-600 cursor-pointer" onClick={() => setSelectedGame(null)}>Modules</span>
                  <span>/</span>
                  <span className="text-blue-600">{selectedGame.category}</span>
                </nav>
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  {selectedGame.title}
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-bold uppercase">Active Session</span>
                </h2>
                <p className="text-sm text-slate-500 mt-1">{selectedGame.description}</p>
              </div>
              <button
                onClick={() => setSelectedGame(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors group"
                title="Exit Module"
              >
                <X className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
              </button>
            </div>

            {/* Application Container */}
            <div className="relative aspect-video w-full bg-slate-900 rounded-xl overflow-hidden shadow-xl border border-slate-200 group">
              <iframe
                src={selectedGame.url}
                className="absolute inset-0 w-full h-full border-0"
                allow="fullscreen"
                title={selectedGame.title}
              />
              {/* Stealth Overlay for focus */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="px-3 py-1.5 bg-white shadow-lg rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-50">
                  Focus Mode
                </button>
              </div>
            </div>

            {/* Sidebar-style Info Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 text-blue-600 mb-4">
                  <FileText className="w-4 h-4" />
                  <h3 className="font-bold text-xs uppercase tracking-widest">Logic Breakdown</h3>
                </div>
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>
                    This interactive module focuses on recursive patterns and spatial logic. 
                    Users are encouraged to identify variable shifts and solve for optimization.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">Difficulty</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] uppercase text-slate-400 font-bold block">Prerequisites</span>
                        <span className="text-xs font-medium text-slate-800 italic">None</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-600 rounded-xl p-6 text-white shadow-lg space-y-4">
                  <h4 className="font-bold text-lg">Save Progress?</h4>
                  <p className="text-blue-100 text-sm italic">Log in with your academic credentials to track your problem-solving metrics.</p>
                  <button className="w-full py-2 bg-white text-blue-600 font-bold rounded-lg text-sm hover:bg-blue-50 transition-colors">
                    SIGN IN
                  </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-10">
              <div className="max-w-2xl space-y-4">
                <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-slate-900">
                  Interactive <span className="text-blue-600">Decision</span> <br />
                  & Logic Modules.
                </h2>
                <p className="text-slate-500 text-lg">
                  Explore curated logic synthesizers and mathematical visualization tools designed 
                  to enhance spatial reasoning and pattern recognition.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 shadow-sm">
                  12 Active Sets
                </div>
                <div className="px-4 py-2 math-gradient rounded-lg text-sm font-semibold text-white shadow-md">
                  View Full Curriculum
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                {['All Modules', 'Probability', 'Geometry', 'Logic'].map((cat, i) => (
                  <button 
                    key={cat}
                    className={`px-4 py-2 text-xs font-bold rounded-full transition-all border ${i === 0 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-500 hover:border-blue-400 hover:text-blue-600'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                <LayoutGrid className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold">Standard View</span>
              </div>
            </div>

            {/* Learning Grid */}
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode='popLayout'>
                  {filteredGames.map((game, index) => (
                    <motion.div
                      key={game.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedGame(game)}
                      className="group cursor-pointer math-card-border rounded-xl p-3 flex flex-col"
                      id={`module-${game.id}`}
                    >
                      <div className="aspect-[4/3] rounded-lg overflow-hidden relative mb-4 bg-slate-200">
                        <img 
                          src={game.thumbnail} 
                          alt={game.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur rounded shadow-sm font-bold text-[9px] text-blue-600 uppercase tracking-tighter">
                          Unit {index + 1}
                        </div>
                      </div>
                      <div className="px-2 pb-2">
                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {game.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                            Theory: {game.category}
                          </span>
                        </div>
                        <p className="text-slate-500 text-xs mt-3 line-clamp-2 italic leading-relaxed">
                          "{game.description}"
                        </p>
                      </div>
                      <div className="mt-auto px-2 pt-4 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400">MATHFLOW-VERIFIED</span>
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                          <BookOpen className="w-3 h-3 text-slate-400 group-hover:text-white" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              {filteredGames.length === 0 && (
                <div className="text-center py-20 bg-slate-100 rounded-xl border-2 border-dashed border-slate-200">
                  <Calculator className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">No learning models found matching your search parameters.</p>
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      {/* Corporate Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
             <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              <span className="font-display font-bold text-slate-900">MATHFLOW<span className="text-blue-600">ACADIA</span></span>
             </div>
             <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
               Empowering students worldwide with accessible, high-performance visualization tools for higher mathematical concepts.
             </p>
          </div>
          <div className="grid grid-cols-2 gap-8 uppercase">
            <div className="space-y-3">
              <h5 className="text-[10px] font-black text-slate-400 tracking-widest">Resources</h5>
              <div className="flex flex-col gap-2 text-xs font-bold text-slate-600">
                <a href="#" className="hover:text-blue-600">Documentation</a>
                <a href="#" className="hover:text-blue-600">Calculators</a>
                <a href="#" className="hover:text-blue-600">Help Center</a>
              </div>
            </div>
            <div className="space-y-3">
              <h5 className="text-[10px] font-black text-slate-400 tracking-widest">Legal</h5>
              <div className="flex flex-col gap-2 text-xs font-bold text-slate-600">
                <a href="#" className="hover:text-blue-600">Privacy Policy</a>
                <a href="#" className="hover:text-blue-600">Accessibility</a>
                <a href="#" className="hover:text-blue-600">Compliance</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between items-end">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold text-slate-600 uppercase">Gateway Secure: v.8.1.0</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              © 2026 MATHFLOW LEARNING HUB. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
