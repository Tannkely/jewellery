import gulp from 'gulp';
import plumber from 'gulp-plumber';
import newer from 'gulp-newer';
import less from 'gulp-less';
// import sass from 'gulp-dart-scss';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import concat from 'gulp-concat';
import posthtml from 'gulp-posthtml';
import include from 'posthtml-include';
import squoosh from 'gulp-libsquoosh';
import webp from 'gulp-webp';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import del from 'del';
import browser from 'browser-sync';

// Styles

export const styles = () => {
  return gulp.src('source/scss/style.scss', {
      sourcemaps: true
    })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso(),
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', {
      sourcemaps: '.'
    }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src(['source/*.html', '!source/**/_*.*'])
    .pipe(plumber())
    .pipe(posthtml([include()]))
    .pipe(gulp.dest('build'));
}

// Scripts

const scripts = () => {
  return gulp.src(['source/js/modules/*.js', '!source/**/_*.*'], {
      sourcemaps: true,
    })
    // .pipe(terser())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/js', {
      sourcemaps: '.',
    }))
    .pipe(browser.stream());
}

const scriptsVendor = () => {
  return gulp.src(['source/js/vendor/*.js', '!source/**/_*.*'], {
      sourcemaps: true,
    })
    // .pipe(terser())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('build/js', {
      sourcemaps: '.',
    }))
    .pipe(browser.stream());
}

// Images

const optimizeImages = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(newer('build/img'))
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'))
}

const copyImages = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(gulp.dest('build/img'))
}

// WebP

export const createWebp = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    // .pipe(newer('build/img'))
    // .pipe(webp({
    //   quality: 90
    // }))
    .pipe(squoosh({
      encodeOptions: {
        webp: {},
      },
    }))
    .pipe(gulp.dest('build/img'))
}

// SVG

const svg = (done) => {
  gulp.src(['source/img/*.svg', '!source/img/icons/*.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/img'));
  done();
}

export const sprite = () => {
  return gulp.src('source/img/sprite/*.svg')
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite_auto.svg'))
    .pipe(gulp.dest('build/img'));
}

// Copy

const copy = (done) => {
  gulp.src([
      'source/fonts/*.{woff2,woff}',
      'source/*.ico',
    ], {
      base: 'source'
    })
    .pipe(gulp.dest('build'))
  done();
}


// Clean

const clean = () => {
  return del('build');
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
}

// Watcher

export const watcher = () => {
  gulp.watch(['source/scss/**/*.scss', '!source/**/_*.*'], gulp.series(styles));
  gulp.watch(['source/js/modules/*.js', '!source/**/_*.*'], gulp.series(scripts));
  gulp.watch(['source/js/vendor/*.js', '!source/**/_*.*'], gulp.series(scriptsVendor));
  gulp.watch('source/**/*.html', gulp.series(html, reload));
  gulp.watch(['source/img/**/*.{jpg,png}', '!source/**/_*.*'], gulp.series(optimizeImages, createWebp, reload));
  gulp.watch(['source/img/*.svg', '!source/img/icons/*.svg'], gulp.series(svg, reload));
  gulp.watch(['source/img/sprite/*.svg', '!source/**/_*.*'], gulp.series(sprite, reload));
}

// Build

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    scriptsVendor,
    svg,
    sprite,
    createWebp
  ),
);

// Default


export default gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    scriptsVendor,
    svg,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  ));
