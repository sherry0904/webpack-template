import 'jquery';
import '../css/style.css'
import '../img/test.jpg'

if (module.hot) {
    module.hot.accept();
}
if (process.env.NODE_ENV === "production") {
    console.log("production");
}
if (process.env.NODE_ENV === "development") {
    console.log("development");
}

$(function () {
    $(window).on("load",() => {
        console.log("loaded!!!")
    });
})