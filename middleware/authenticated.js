export default function (context) {
  if (!context.$cookies.get("token")) {
    context.redirect(context.app.localePath("/"));
  }
}
