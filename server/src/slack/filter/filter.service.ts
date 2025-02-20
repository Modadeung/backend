import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebClient } from '@slack/web-api';
import { ISlackConfig } from 'src/config';
import { FilterSlackEvent } from './filter.event';

@Injectable()
export class FilterSlackService {
  private readonly slackClient: WebClient;
  private readonly conversationId: string = 'C08DNDXQZ7C'; // 에러 슬랙 채널 ID

  constructor(private readonly configService: ConfigService<ISlackConfig>) {
    this.slackClient = new WebClient(configService.get('slackBotOauthToken'));
  }

  async sendErrorMessage(event: FilterSlackEvent) {
    const { code, status, method, path, message, stackTrace } = event;
    try {
      await this.slackClient.chat.postMessage({
        channel: this.conversationId,
        text: '🚨 *서버 에러 발생!*',
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: '🚨 서버 에러 발생!',
              emoji: true,
            },
          },
          {
            type: 'section',
            fields: [
              { type: 'mrkdwn', text: `*에러 코드*\n\`${code}\`` },
              { type: 'mrkdwn', text: `*상태 코드*\n\`${status}\`` },
              { type: 'mrkdwn', text: `*요청 URL*\n\`${method} ${path}\`` },
              { type: 'mrkdwn', text: `*메시지*\n\`${message}\`` },
            ],
          },
          { type: 'divider' },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*📝 스택 트레이스*\n\`\`\`${stackTrace}\`\`\``,
            },
          },
          { type: 'divider' },
          {
            type: 'context',
            elements: [
              { type: 'mrkdwn', text: '_🔍 에러 확인 후 대응이 필요합니다._' },
            ],
          },
        ],
      });
    } catch (error) {
      console.error('Failed to send Slack message:', error);
    }
  }
}
