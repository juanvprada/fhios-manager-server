export class KnowledgeBaseController {
    static async create(req: Request, res: Response, next: NextFunction) {
      try {
        await validateKnowledgeBase(req.body);
        const article = await KnowledgeBaseService.createArticle(
          req.body,
          req.user.id
        );
        res.status(201).json(article);
      } catch (error) {
        next(error);
      }
    }
  
    static async search(req: Request, res: Response, next: NextFunction) {
      try {
        const articles = await KnowledgeBaseService.searchArticles(
          req.query.q as string,
          req.query.projectId ? Number(req.query.projectId) : undefined
        );
        res.json(articles);
      } catch (error) {
        next(error);
      }
    }
  }