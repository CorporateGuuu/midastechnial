/**
 * Emoji Cleaner Utility
 * Strips emojis from text nodes as a safety net for dynamic content
 * Robust regex pattern covering all Unicode emoji ranges
 */

(function() {
  'use strict';

  /**
   * Comprehensive regex pattern for emoji detection
   * Covers: Basic emojis, skin tones, gender variations, flags, symbols, and ZWJ sequences
   */
  const EMOJI_REGEX = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1f926}-\u{1f937}]|[\u{10000}-\u{1fffd}]|[\u{2640}-\u{2642}]|[\u{2648}-\u{2653}]|[\u{26A0}-\u{26A1}]|[\u{2620}-\u{263F}]|[\u{1F1F2}-\u{1F1F4}]|[\u{1F1E6}-\u{1F1FF}]|[\u{1F201}-\u{1F202}]|[\u{1F21A}-\u{1F21B}]|[\u{1F22F}]|[\u{1F232}-\u{1F23A}]|[\u{1F250}-\u{1F251}]|[\u{1F191}-\u{1F19A}]|[\u{1F1AD}-\u{1F1E5}]|[\u{1F203}-\u{1F20F}]|[\u{1F233}-\u{1F236}]|[\u{1F237}]|[\u{1F238}-\u{1F240}]|[\u{1F241}-\u{1F242}]|[\u{1F243}-\u{1F245}]|[\u{1F246}-\u{1F24F}]|[\u{1F440}]|[\u{1F442}-\u{1F44F}]|[\u{1F451}]|[\u{1F452}-\u{1F45F}]|[\u{1F460}-\u{1F463}]|[\u{1F464}]|[\u{1F465}]|[\u{1F466}-\u{1F46B}]|[\u{1F46C}-\u{1F46F}]|[\u{1F470}-\u{1F478}]|[\u{1F479}-\u{1F47B}]|[\u{1F47C}-\u{1F47F}]|[\u{1F480}-\u{1F483}]|[\u{1F484}]|[\u{1F485}-\u{1F487}]|[\u{1F488}]|[\u{1F489}]|[\u{1F48A}]|[\u{1F48B}]|[\u{1F48C}]|[\u{1F48D}]|[\u{1F48E}]|[\u{1F48F}]|[\u{1F490}]|[\u{1F491}-\u{1F493}]|[\u{1F494}]|[\u{1F495}]|[\u{1F496}]|[\u{1F497}]|[\u{1F498}]|[\u{1F499}-\u{1F49F}]|[\u{1F4A0}-\u{1F4A3}]|[\u{1F4A4}]|[\u{1F4A5}]|[\u{1F4A6}]|[\u{1F4A7}]|[\u{1F4A8}]|[\u{1F4A9}]|[\u{1F4AA}-\u{1F4AF}]|[\u{1F4B0}-\u{1F4BF}]|[\u{1F4C0}]|[\u{1F4C1}-\u{1F4C4}]|[\u{1F4C5}]|[\u{1F4C6}]|[\u{1F4C7}-\u{1F4C9}]|[\u{1F4CA}]|[\u{1F4CB}]|[\u{1F4CC}]|[\u{1F4CD}]|[\u{1F4CE}-\u{1F4CF}]|[\u{1F4D0}-\u{1F4D3}]|[\u{1F4D4}-\u{1F4D5}]|[\u{1F4D6}-\u{1F4D9}]|[\u{1F4DA}-\u{1F4DB}]|[\u{1F4DC}]|[\u{1F4DD}]|[\u{1F4DE}]|[\u{1F4DF}]|[\u{1F4E0}-\u{1F4E5}]|[\u{1F4E6}-\u{1F4E9}]|[\u{1F4EA}-\u{1F4ED}]|[\u{1F4EE}]|[\u{1F4EF}]|[\u{1F4F0}-\u{1F4F3}]|[\u{1F4F4}]|[\u{1F4F5}]|[\u{1F4F6}]|[\u{1F4F7}-\u{1F4F9}]|[\u{1F4FA}]|[\u{1F4FB}]|[\u{1F4FC}]|[\u{1F4FD}]|[\u{1F4FE}]|[\u{1F4FF}]|[\u{1F500}-\u{1F53D}]|[\u{1F546}-\u{1F54A}]|[\u{1F54B}-\u{1F54F}]|[\u{1F550}-\u{1F567}]|[\u{1F56F}]|[\u{1F570}]|[\u{1F573}-\u{1F579}]|[\u{1F57A}]|[\u{1F587}]|[\u{1F58A}-\u{1F58D}]|[\u{1F590}]|[\u{1F595}-\u{1F596}]|[\u{1F5A4}]|[\u{1F5A5}]|[\u{1F5A8}]|[\u{1F5B1}-\u{1F5B3}]|[\u{1F5BC}]|[\u{1F5C2}-\u{1F5C4}]|[\u{1F5D1}-\u{1F5D3}]|[\u{1F5DC}-\u{1F5DE}]|[\u{1F5E1}]|[\u{1F5E3}]|[\u{1F5E8}]|[\u{1F5EF}]|[\u{1F5F3}]|[\u{1F5FA}]|[\u{1F5FB}-\u{1F5FF}]|[\u{1F600}-\u{1F636}]|[\u{1F637}-\u{1F640}]|[\u{1F641}-\u{1F644}]|[\u{1F645}-\u{1F64F}]|[\u{1F680}-\u{1F6C5}]|[\u{1F6C6}-\u{1F6CB}]|[\u{1F6CC}]|[\u{1F6CD}-\u{1F6CF}]|[\u{1F6D0}]|[\u{1F6D1}-\u{1F6D2}]|[\u{1F6D5}]|[\u{1F6E0}-\u{1F6E5}]|[\u{1F6E9}]|[\u{1F6EB}-\u{1F6EC}]|[\u{1F6F0}]|[\u{1F6F3}]|[\u{1F6F4}-\u{1F6F8}]|[\u{1F6F9}]|[\u{1F6FA}]|[\u{1F7E0}-\u{1F7EB}]|[\u{1F90C}]|[\u{1F90D}-\u{1F90F}]|[\u{1F910}-\u{1F918}]|[\u{1F919}-\u{1F91E}]|[\u{1F91F}]|[\u{1F920}-\u{1F927}]|[\u{1F928}-\u{1F92F}]|[\u{1F930}]|[\u{1F931}-\u{1F932}]|[\u{1F933}-\u{1F93A}]|[\u{1F93C}-\u{1F93E}]|[\u{1F93F}]|[\u{1F940}-\u{1F945}]|[\u{1F947}-\u{1F94B}]|[\u{1F94C}]|[\u{1F94D}-\u{1F94F}]|[\u{1F950}-\u{1F95E}]|[\u{1F95F}-\u{1F96B}]|[\u{1F96C}-\u{1F970}]|[\u{1F971}]|[\u{1F972}]|[\u{1F973}-\u{1F976}]|[\u{1F977}-\u{1F978}]|[\u{1F979}]|[\u{1F97A}-\u{1F97F}]|[\u{1F980}-\u{1F984}]|[\u{1F985}-\u{1F991}]|[\u{1F992}-\u{1F997}]|[\u{1F998}-\u{1F9A2}]|[\u{1F9A3}-\u{1F9A4}]|[\u{1F9A5}-\u{1F9AA}]|[\u{1F9AB}-\u{1F9AD}]|[\u{1F9AE}-\u{1F9AF}]|[\u{1F9B0}-\u{1F9B9}]|[\u{1F9BA}-\u{1F9BF}]|[\u{1F9C0}]|[\u{1F9C1}-\u{1F9C2}]|[\u{1F9C3}-\u{1F9CA}]|[\u{1F9CB}]|[\u{1F9CC}]|[\u{1F9CD}-\u{1F9CF}]|[\u{1F9D0}-\u{1F9E6}]|[\u{1F9E7}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FA73}]|[\u{1FA74}-\u{1FA7A}]|[\u{1FA7B}-\u{1FA7C}]|[\u{1FA80}-\u{1FA82}]|[\u{1FA83}-\u{1FA86}]|[\u{1FA90}-\u{1FA95}]|[\u{1FA96}-\u{1FAA8}]|[\u{1FAA9}-\u{1FAAC}]|[\u{1FAAD}-\u{1FAAF}]|[\u{1FAB0}-\u{1FAB6}]|[\u{1FAB7}-\u{1FABA}]|[\u{1FABB}-\u{1FABD}]|[\u{1FABF}]|[\u{1FACE}-\u{1FADB}]|[\u{1FADF}]|[\u{1FAE0}-\u{1FAE7}]|[\u{1FAE8}]|[\u{1FAF0}-\u{1FAF6}]|[\u{1FAF7}-\u{1FAF8}]/gu;

  /**
   * Strip emojis from text content
   * @param {string} text - The text to clean
   * @returns {string} - Text with emojis removed
   */
  function stripEmojis(text) {
    if (typeof text !== 'string') {
      return text;
    }
    return text.replace(EMOJI_REGEX, '');
  }

  /**
   * Walk the DOM tree and strip emojis from all text nodes
   * @param {Node} node - The root node to start walking from
   */
  function walkDOMAndStripEmojis(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      // Only modify text nodes that actually contain emojis
      if (EMOJI_REGEX.test(node.textContent)) {
        node.textContent = stripEmojis(node.textContent);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Skip script, style, and other elements where emojis might be intentional
      const tagName = node.tagName.toLowerCase();
      if (tagName !== 'script' && tagName !== 'style' && tagName !== 'noscript') {
        // Process all child nodes
        const childNodes = Array.from(node.childNodes);
        childNodes.forEach(walkDOMAndStripEmojis);
      }
    }
  }

  /**
   * Initialize emoji stripping on page load
   */
  function initEmojiStripper() {
    // Process the entire document body
    if (document.body) {
      walkDOMAndStripEmojis(document.body);
    }

    // Set up a mutation observer for dynamically added content
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          walkDOMAndStripEmojis(node);
        });
      });
    });

    // Start observing
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    // Store reference for potential cleanup
    window.emojiStripperObserver = observer;
  }

  /**
   * Cleanup function to disconnect the observer
   */
  function cleanupEmojiStripper() {
    if (window.emojiStripperObserver) {
      window.emojiStripperObserver.disconnect();
      delete window.emojiStripperObserver;
    }
  }

  // Expose functions globally for potential manual use
  window.emojiStripper = {
    strip: stripEmojis,
    init: initEmojiStripper,
    cleanup: cleanupEmojiStripper
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEmojiStripper);
  } else {
    // DOM is already loaded
    initEmojiStripper();
  }

  // Also run on window load as a fallback
  window.addEventListener('load', function() {
    // Double-check in case DOMContentLoaded didn't catch everything
    if (document.body) {
      walkDOMAndStripEmojis(document.body);
    }
  });

})();
