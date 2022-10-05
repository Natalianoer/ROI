var gulp = require('gulp');
var sass = require('gulp-sass');
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf');

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: './',
        js: 'js/',
        css: 'css/',
        img: 'img/',
        fonts: 'fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/**/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/style/style.scss',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

gulp.task('html', function () {
    return gulp.src(path.src.html) //Выберем файлы по нужному пути
          .pipe(rigger()) //Прогоним через rigger
          .pipe(gulp.dest(path.build.html)); //Выплюнем их в папку build
});

gulp.task('js', function () {
    return gulp.src(path.src.js) //Найдем наш main файл
          .pipe(rigger()) //Прогоним через rigger
          .pipe(sourcemaps.init()) //Инициализируем sourcemap
          //.pipe(uglify()) //Сожмем наш js
          .pipe(sourcemaps.write()) //Пропишем карты
          .pipe(gulp.dest(path.build.js)); //Выплюнем готовый файл в build
});

gulp.task('style', function () {
    return gulp.src(path.src.style) //Выберем наш main.scss
          .pipe(sourcemaps.init()) //То же самое что и с js
          .pipe(sass()) //Скомпилируем
          .pipe(prefixer()) //Добавим вендорные префиксы
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(path.build.css)); //И в build
});

gulp.task('image', function () {
    return gulp.src(path.src.img) //Выберем наши картинки
          .pipe(imagemin({ //Сожмем их
              progressive: true,
              svgoPlugins: [{removeViewBox: false}],
              use: [pngquant()],
              interlaced: true
          }))
          .pipe(gulp.dest(path.build.img)); //И бросим в build
});

gulp.task('fonts', function() {
    return gulp.src(path.src.fonts)
          .pipe(gulp.dest(path.build.fonts))
});

// сборка
gulp.task('build', gulp.series('html', 'style', 'js', 'fonts', 'image', function (done) {
    done();
}));

gulp.task('watch', function(){
    return  gulp.watch([path.watch.style], gulp.series('style')),
            gulp.watch([path.watch.html], gulp.series('html')),
            gulp.watch([path.watch.js], gulp.series('js')),
            gulp.watch([path.watch.img], gulp.series('image')),
            gulp.watch([path.watch.fonts], gulp.series('fonts'));
});
