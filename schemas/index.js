import seq from '../utils/db_config.js'
import colors from 'colors'
import userSchema from './user_schema.js';
import contestSchema from './contest_schema.js';
import voteSchema from './vote_schema.js';
import postSchema from './post_schema.js';
import blogSchema from './blog_schema.js';
import dotenv from 'dotenv'
dotenv.config()

// make relations between the tables

// Contestant creates Post (one-to-many)
userSchema.hasMany(postSchema, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
postSchema.belongsTo(userSchema, { foreignKey: 'user_id' });

// Contestant votes Post (many-to-many)
userSchema.belongsToMany(postSchema, {
    through: voteSchema,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
postSchema.belongsToMany(userSchema, {
    through: voteSchema,
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

// Admin creates Contest (one-to-many)
userSchema.hasMany(contestSchema, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
contestSchema.belongsTo(userSchema, { foreignKey: 'user_id' });

// Admin creates Blog (one-to-many)
userSchema.hasMany(blogSchema, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
blogSchema.belongsTo(userSchema, { foreignKey: 'user_id' });

// Contest has Post (one-to-many)
contestSchema.hasMany(postSchema, {
    foreignKey: 'contest_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
postSchema.belongsTo(contestSchema, { foreignKey: 'contest_id' });

// if(process.env.SERVER === 'Dev')
//     seq.sync({ alter: true })
//     .then(() => console.log('Database & tables created!'.bgYellow))
//     .catch(e => console.log(e));


export default seq