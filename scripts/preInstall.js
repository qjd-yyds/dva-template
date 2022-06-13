const allowPM = 'npm';
const userAgent = process.env.npm_config_user_agent || '';
if (userAgent) {
  const pmName = userAgent.substring(0, userAgent.indexOf('/'));
  if (pmName !== allowPM) {
    console.warn(
      `\u001b[33m This repository requires using ${allowPM} as the package manager for scripts to work properly.\u001b[39m\n`
    );
    process.exit(1);
  }
}
