import * as log from 'tracer';

const logger = log.colorConsole({
  level:"log",
  format: '{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})',
  dateformat: 'dd-mm-yyyy HH:MM:ss.L'
});

export = logger;