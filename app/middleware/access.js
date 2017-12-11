module.exports = options => {
    return async function access(ctx, next) {
        
        if (!ctx.cookies.get('userId')) {
             ctx.throw(403);
        }
        await next(); 
    }
};
  