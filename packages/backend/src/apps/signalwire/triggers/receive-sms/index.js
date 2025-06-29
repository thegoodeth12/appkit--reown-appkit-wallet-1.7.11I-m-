import defineTrigger from '../../../../helpers/define-trigger.js';
import fetchMessages from './fetch-messages.js';

export default defineTrigger({
  name: 'Receive SMS',
  key: 'receiveSms',
  pollInterval: 15,
  description: 'Triggers when a new SMS is received.',
  arguments: [
    {
      label: 'To Number',
      key: 'toNumber',
      type: 'dropdown',
      required: true,
      description:
        'The number to receive the SMS on. It should be a SignalWire number in your project.',
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listIncomingSmsPhoneNumbers',
          },
        ],
      },
    },
  ],

  async run($) {
    await fetchMessages($);
  },
});
