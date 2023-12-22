/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2022-2023 Objectionary.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const path = require('path');
const mvnw = require('../mvnw');

/**
 * Command to assemble .XMIR files.
 * @param {Hash} opts - All options
 * @return {Promise} of assemble task
 */
module.exports = function(opts) {
  return mvnw([
    'eo:assemble',
    '-Deo.version=' + opts.parser,
    '-Deo.hash=' + (opts.hash ? opts.hash : opts.parser),
    opts.verbose ? '--errors' : '',
    opts.verbose ? '' : '--quiet',
    opts.trackOptimizationSteps ? '-Deo.trackOptimizationSteps' : '',
    opts.debug ? '--debug' : '',
    `-Deo.targetDir=${path.resolve(opts.target)}`,
    `-Deo.outputDir=${path.resolve(opts.target, 'classes')}`,
    `-Deo.placed=${path.resolve(opts.target, 'eo-placed.csv')}`,
    `-Deo.placedFormat=csv`,
  ], opts.target, opts.batch).then((r) => {
    console.info('EO program assembled in %s', path.resolve(opts.target));
    return r;
  });
};
