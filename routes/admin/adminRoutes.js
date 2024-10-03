import AdminJS from 'adminjs';
import { buildRouter } from '@adminjs/express';
import { Database, Resource } from '@adminjs/mongoose'; // Correct import
import mongoose from 'mongoose'; // Import mongoose
import  {User} from '../../models/accounts/user.js'; // Adjusted path
import { Services } from '../../models/main/service.js';
import { Projects } from '../../models/main/project.js';
import { Description } from '../../models/main/descriptions.js';
import Message from '../../models/main/Message.js'


// Register the AdminJS mongoose adapter with Database and Resource
AdminJS.registerAdapter({ Database, Resource });

const adminJs = new AdminJS({
  resources: [
    { resource: User, options: {} },  // First resource
    { resource: Services, options: {} }, 
    {resource: Message ,options:{},},
    { resource: Projects, options: {} },
    { resource: Description, options: {} }, // Second resource
  ],
  rootPath: '/admin',
});

const router = buildRouter(adminJs);

export default router;
