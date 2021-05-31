module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    Event: function(event, init) {
      this.type = event;
    },
  }
};