import { privateRoute } from "../../lib/ironSessionConfig";

export default privateRoute((req, res) => {
  req.session.destroy();
  res.redirect('/')
});