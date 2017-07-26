const SlackJS = require('node-slack')
const underscore = require('underscore')

const Slack = function (config, runtime) {
  if (!(this instanceof Slack)) return new Slack(config, runtime)

  if (!config.slack) throw new Error('config.slack undefined')

  if (!config.slack.webhook) throw new Error('config.slack.webhook undefined')

  this.slackjs = new SlackJS(runtime.config.slack.webhook)

  runtime.notify = (debug, payload) => {
    const params = runtime.config.slack

    underscore.defaults(payload, {
      channel: params.channel,
      username: params.username || process.npminfo.name,
      icon_url: params.icon_url,
      text: 'ping.'
    })
    this.slackjs.send(payload, (res, err, body) => {
      if (err) debug('notify', err)
    })
  }
}

module.exports = Slack