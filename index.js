// module.exports = (app) => {
//   app.on('*', check);
//   app.log('I was here');

//   async function check(context) {
//     app.on('*', check);

//     app.log('I was here');

//     const startTime = new Date();
//     // Do stuff
//     const { head_branch: headBranch, head_sha: headSha } = context.payload.check_suite;
//   }
// };

module.exports = (app) => {
  app.on('check_run.completed', async (context) => {
    // An issue was opened or edited, what should we do with it?
    app.log(context.payload.check_run.conclusion);
    if (
      context.payload.check_run.conclusion === 'success' &&
      context.payload.check_run.check_suite.head_branch.indexOf('block-') === 0
    ) {
      // Send a request to laxmi about test
      // we will send the name of block
      // Laxmi will provide us the name of parent branch in the response
      app.log(
        'Github Token: ',
        await context.github.repos.merge({
          owner: 'sunnyssr',
          repo: 'AS-test-repo',
          base: 'exercise-01',
          head: context.payload.check_run.check_suite.head_branch,
        })
      );
    }
  });
};
