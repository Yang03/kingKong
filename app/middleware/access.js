module.exports = options => {
    return async function access(ctx, next) {
        await next(); 
        if (!ctx.cookies.get('userId')) {
             ctx.throw(403);
        }
    }
};
  