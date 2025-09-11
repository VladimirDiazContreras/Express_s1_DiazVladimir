// Importamos swagger
import { swaggerUi, swaggerDocument } from "./config/swagger.js";

class App {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.db = new Database(process.env.MONGODB_URI);
    }

    async init(){
        await this.db.connect;
        this.app.use(express.json());

        this.app.get("/", (req,res)=>{
            res.json({ ok:true, service:"SERVICIO CRUD DE USUARIO" });
        });

        // Dependencias de usuarios
        const userRepo = new UserRepository(UserModel);
        const userSrv  = new UserService(userRepo);
        const userCtrl = new UserController(userSrv);

        // Rutas API
        this.app.use("/api/users", buildUserRouter(userCtrl));

        // Swagger con OpenAPI YAML
        this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        this.app.listen(this.port,()=>{
            console.log("Server running on :"+this.port);
            console.log("Swagger docs en: http://localhost:"+this.port+"/docs");
        });
    }
}
