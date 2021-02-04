// Copyright (c) 2015 - 2019 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/* global document */
const defaultStyle = {
  zIndex: 1,
  position: 'absolute',
  pointerEvents: 'none',
  color: '#a0a7b4',
  backgroundColor: '#29323c',
  padding: '10px',
  top: 0,
  left: 0,
  display: 'none'
};

export default class Tooltip {
  constructor(canvas) {
    const canvasParent = canvas.parentElement;

    if (canvasParent) {
      this.el = document.createElement('div');
      this.el.className = 'deck-tooltip';
      Object.assign(this.el.style, defaultStyle);
      canvasParent.appendChild(this.el);
    }
  }

  setTooltip(displayInfo, x, y) {
    const el = this.el;

    if (typeof displayInfo === 'string') {
      el.innerText = displayInfo;
    } else if (!displayInfo) {
      el.style.display = 'none';
      return;
    } else {
      if ('text' in displayInfo) {
        el.innerText = displayInfo.text;
      }
      if ('html' in displayInfo) {
        el.innerHTML = displayInfo.html;
      }
      if ('className' in displayInfo) {
        el.className = displayInfo.className;
      }
      Object.assign(el.style, displayInfo.style);
    }
    el.style.display = 'block';
    el.style.transform = `translate(${x}px, ${y}px)`;
  }

  remove() {
    if (this.el) {
      this.el.remove();
    }
  }
}
