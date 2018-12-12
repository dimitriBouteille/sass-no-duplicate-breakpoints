const gulp = require('gulp')
const sass = require('gulp-sass')

/**
 * Configuration vars
 * @type {{}}
 */
const config = {
    sassSrc :   'scss/**/*.scss',
    cssDist :   'css',
};

/**
 * Compile sass
 * @returns {*}
 */
exports.compile = () => {

    return gulp.src(config.sassSrc)
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(gulp.dest(config.cssDist))
}
exports.compile.description = `Compile sass file in ${config.cssDist}`

/**
 * Watch Sass file
 * @return {undefined}
 */
exports.watch = () => {

    gulp.watch('scss/**/*.scss', gulp.series('compile'))
}
exports.watch.description = `Watch Sass file in ${config.sassSrc}`
