import * as express from 'express';
import { ngExpressEngine } from '@nguniversal/express-engine';

const app = express();

app.engine('html', ngExpressEngine({
    bootstrap: ServerAppModule
}));

app.set('view engine', 'html');

app.get('/**/*', (req: Request, res: Response) => {
    res.render('../dist/index', {
        req,
        res
    });
});
