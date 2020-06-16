exports.up = function (knex) {
    return knex.schema
        .createTable("description", (tbl) => {
            tbl.increments();

            tbl.string("name", 128).notNullable().unique();
        })
        .createTable("users", (tbl) => {
            tbl.increments();

            tbl.string("username", 128).notNullable().unique().index();
            tbl.string("password", 256).notNullable();

            tbl.integer("description")
                .unsigned()
                .references("description.id")
                .onDelete("RESTRICT")
                .onUpdate("CASCADE");
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("description")
        .dropTableIfExists("users");
};
