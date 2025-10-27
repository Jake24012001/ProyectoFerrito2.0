Les tengo que decir que esta en proceso esta nueva base de datos , lo que falta pido que ayuden a completar, gracias

// metodo para poder reiniciar la secuencia serial de cualquier tabla
ALTER SEQUENCE categorias_id_categoria_seq RESTART WITH 1; 
ALTER SEQUENCE auditoriaproductos_id_auditoria_seq RESTART WITH 1;
ALTER SEQUENCE productos_id_producto_seq RESTART WITH 1;
ALTER SEQUENCE usuarios_id_usuario_seq RESTART WITH 1;


// codigos para mandar a corre el proyecto en REAC
npm run dev