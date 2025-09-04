import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Account, OAuthProvider } from 'node-appwrite';

@Injectable()
export class AppwriteService {
  private readonly logger = new Logger(AppwriteService.name);
  private client: Client;
  private account: Account;

  constructor(private configService: ConfigService) {
    this.initializeClient();
  }

  private initializeClient(): void {
    const endpoint = this.configService.get<string>('appwrite.endpoint') ||
                    this.configService.get<string>('APPWRITE_ENDPOINT') ||
                    process.env.APPWRITE_ENDPOINT;
    const projectId = this.configService.get<string>('appwrite.projectId') ||
                     this.configService.get<string>('APPWRITE_PROJECT_ID') ||
                     process.env.APPWRITE_PROJECT_ID;
    const apiKey = this.configService.get<string>('appwrite.apiKey') ||
                  this.configService.get<string>('APPWRITE_API_KEY') ||
                  process.env.APPWRITE_API_KEY;

    this.logger.log(`Appwrite config: endpoint=${!!endpoint}, projectId=${!!projectId}, apiKey=${!!apiKey}`);

    if (!endpoint || !projectId) {
      this.logger.warn('Appwrite configuration is missing - service will be limited');
      // Don't throw error, just log warning for development
      return;
    }

    this.client = new Client().setEndpoint(endpoint).setProject(projectId);

    if (apiKey) {
      this.client.setKey(apiKey);
    }

    this.account = new Account(this.client);
    this.logger.log('Appwrite client initialized successfully');
  }

  async createGitHubOAuthUrl(
    successUrl: string,
    failureUrl: string
  ): Promise<string | void> {
    try {
      const sessionUrl = this.account.createOAuth2Token({
        provider: OAuthProvider.Github,
        success: successUrl,
        failure: failureUrl,
      });

      if (!sessionUrl) {
        throw new Error('Failed to generate OAuth URL');
      }
      return sessionUrl;
    } catch (error) {
      this.logger.error('Failed to create GitHub OAuth URL', error);
      throw error;
    }
  }

  async getCurrentUser(sessionSecret?: string): Promise<any> {
    try {
      if (!sessionSecret) {
        throw new Error('Session secret is required');
      }

      const endpoint = this.configService.get<string>('appwrite.endpoint');
      const projectId = this.configService.get<string>('appwrite.projectId');

      const userClient = new Client()
        .setEndpoint(endpoint)
        .setProject(projectId)
        .setSession(sessionSecret);

      const userAccount = new Account(userClient);

      const user = await userAccount.get();

      return user;
    } catch (error) {
      this.logger.error('Error details:', JSON.stringify(error, null, 2));
      throw error;
    }
  }

  async createSessionFromCallback(
    userId: string,
    secret: string
  ): Promise<{ session: any; user: any }> {
    try {
      const session = await this.account.createSession(userId, secret);

      const endpoint = this.configService.get<string>('appwrite.endpoint');
      const projectId = this.configService.get<string>('appwrite.projectId');
      const sessionClient = new Client()
        .setEndpoint(endpoint)
        .setProject(projectId)
        .setSession(session.secret);

      const sessionAccount = new Account(sessionClient);
      const user = await sessionAccount.get();
      return { session, user };
    } catch (error) {
      this.logger.error('Failed to create session from callback', error);
      throw error;
    }
  }

  async deleteSession(secretToken: string): Promise<void> {
    try {
      const endpoint = this.configService.get<string>('appwrite.endpoint');
      const projectId = this.configService.get<string>('appwrite.projectId');

      const userClient = new Client()
        .setEndpoint(endpoint)
        .setProject(projectId)
        .setSession(secretToken);

      const userAccount = new Account(userClient);
      await userAccount.deleteSession({ sessionId: 'current' });
    } catch (error) {
      this.logger.error('Failed to delete session', error);
      throw error;
    }
  }

  async getSessions(sessionId: string): Promise<any> {
    try {
      const endpoint = this.configService.get<string>('appwrite.endpoint');
      const projectId = this.configService.get<string>('appwrite.projectId');

      const userClient = new Client()
        .setEndpoint(endpoint)
        .setProject(projectId)
        .setSession(sessionId);

      const userAccount = new Account(userClient);
      const sessions = await userAccount.listSessions();
      return sessions;
    } catch (error) {
      this.logger.error('Failed to get sessions', error);
      throw error;
    }
  }
}
