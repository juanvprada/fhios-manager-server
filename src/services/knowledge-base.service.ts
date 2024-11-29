import { KnowledgeBase } from '../models/knowledge-base.model';
import { AppError } from '../utils/error';

export class KnowledgeBaseService {
  static async createArticle(articleData: any, userId: number) {
    const article = await KnowledgeBase.create({
      ...articleData,
      created_by: userId,
    });

    await NotificationService.createNotification({
      project_id: articleData.project_id,
      title: 'Nuevo artículo en Base de Conocimientos',
      message: `Se ha añadido un nuevo artículo: ${articleData.title}`,
      type: 'info',
      reference_id: article.kt_id,
    });

    return article;
  }

  static async updateArticle(articleId: number, articleData: any, userId: number) {
    const article = await KnowledgeBase.findByPk(articleId);

    if (!article) {
      throw new AppError(404, 'Article not found');
    }

    await article.update(articleData);
    return article;
  }

  static async searchArticles(query: string, projectId?: number) {
    const whereClause = {
      [Op.and]: [
        projectId ? { project_id: projectId } : {},
        {
          [Op.or]: [
            { title: { [Op.like]: `%${query}%` } },
            { content: { [Op.like]: `%${query}%` } },
          ],
        },
      ],
    };

    return KnowledgeBase.findAll({ where: whereClause });
  }
}