/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * Contributor(s): Michael J Gruber  http://locallink.mozdev.org/
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */


var LocalLink = {
//  _URIFixup : Components.classes["@mozilla.org/docshell/urifixup;1"].getService(Components.interfaces.nsIURIFixup),
//  _pref : Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch(null),

  // This is the node user right clicks on, null if it is not an address node.
  // It is initiliased and reassigned in _isOverLink() only.
  _overLink : null,

  // Modified from optimoz mosgestoverlay.js
  // Given a node, try to get the address node of itself or its parent(s).
  // Returns null if cannot find any.
  _findNodeLink : function(domPosition) {
    if (domPosition == document)
      return null;
    try {
      if(domPosition.nodeName == "A")
        return {node : domPosition, uri : domPosition.href};
      else
        return this._findNodeLink(domPosition.parentNode);
    }
    catch(e) {
      return null;
    }
  },

  // Returns true if the popup node is an address node.
  _isOverLink : function() {
    this._overLink = this._findNodeLink(document.popupNode);
    return (this._overLink != null);
  },

  // Taken from LinkVisitor.
  // This function is invoked in window (?) context,
  // so use 'LocalLink' instead of 'this'.
  // event.originalTarget is the loaded document.
  onWindowLoad : function(event) {
    var parentPopup = document.getElementById('contentAreaContextMenu');
    parentPopup.addEventListener("popupshown", LocalLink._onParentPopupShown, true);
  },

  // This function is invoked in window (?) context,
  // so use 'LocalLink' instead of 'this'
  _onParentPopupShown : function() {
  if (LocalLink._isOverLink()) {
      document.getElementById('llOpenLocalLink').setAttribute('hidden', false);

    //  var fixupURI = LocalLink._getFixupURI(LocalLink._overLink.uri);
    // maybe check file: protocol
    }
    else
      document.getElementById('llOpenLocalLink').setAttribute('hidden', true);
  },

  openLink : function() {
    if (this._overLink == null)
      return;

  //  var fixupURI = this._getFixupURI(this._overLink.uri);
  // open link in new window;
  document.commandDispatcher.focusedWindow.open(this._overLink.uri);
  },

//  _getFixupURI : function(uri) {
//   try {
//      var fixedURI = this._URIFixup.createFixupURI(uri, 0);
//      return fixedURI;
//    }
//    catch(e) {
//      return null;
//    }
//  },

};

// register listener so that we can update the popup

window.addEventListener("load", LocalLink.onWindowLoad, true);
