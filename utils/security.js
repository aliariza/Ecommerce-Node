const crypto = require('crypto');

class Security {
  md5(value) {
    if (!value) {
      return;
    }
    return crypto.createHash('md5').update(value).digest('hex');
  }

  isValidNonce(value, req) {
    return value === this.md5(req.sessionID + req.headers['user-agent']);
  }

  generateId() {
    // eslint-disable-next-line no-bitwise
    const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    const template = '%'.repeat(16);
    return (
      timestamp +
      template
        // eslint-disable-next-line no-bitwise
        .replace(/[%]/g, () => ((Math.random() * 16) | 0).toString(16))
        .toLowerCase()
    );
  }
}

module.exports = Security;
