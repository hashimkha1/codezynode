import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSMongoose from '@adminjs/mongoose';
import {User} from  '../../models/accounts/user';// Example model


// AdminJS setup
AdminJS.registerAdapter(AdminJSMongoose); // Use Mongoose adapter

const adminJs = new AdminJS({
  resources: [User],  // Resources to manage in the admin panel
  rootPath: '/admin',
});

const router = AdminJSExpress.buildRouter(adminJs);

module.exports = router;
