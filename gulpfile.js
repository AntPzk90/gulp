var gulp = require("gulp"),
	browserSync = require("browser-sync"),
	autoprefixer = require('gulp-autoprefixer'),
	less = require("gulp-less"),
	path = require("path"),
	htmlmin = require("gulp-htmlmin"),
	uglify = require("gulp-uglify"),
	pump = require("pump"),
	imagemin = require("gulp-imagemin-fix");
	
gulp.task("browser-sync",function(){
	browserSync.init({
		server : {
			baseDir : "app/"
		},
	});
});
gulp.task("less", function () {
  return gulp.src("app/less/styles.less")
    .pipe(less({
      paths: [ path.join(__dirname, "less", "includes") ]
    }))
    .pipe(gulp.dest("app/css"))
});
gulp.task("watch", ["browser-sync"], function(){
	gulp.watch("app/css/*.css",browserSync.reload);
	gulp.watch("app/*.html").on("change",browserSync.reload);
	gulp.watch("app/less/**/*.less",["less"]);
	gulp.watch("app/less/**/*.less",browserSync.reload);
	gulp.watch("app/script/*.js",browserSync.reload);
});
gulp.task("auto", function(){
    gulp.src("app/css/styles.css")
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("dist/css"))
});
gulp.task("html", function(){
	gulp.src("app/*.html")
	.pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});
gulp.task("compress", function (cb) {
  pump([
        gulp.src("app/script/*.js"),
        uglify(),
        gulp.dest("dist/script")
    ],
    cb
  );
});
gulp.task("image", function (){
    gulp.src("app/imgs/**/**/*.{jpg,jpeg,png,gif,svg}")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/imgs"))
});