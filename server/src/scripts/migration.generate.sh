migration_name=$1

yarn ts-node -r tsconfig-paths/register \
    ./node_modules/typeorm/cli.js \
    -d src/database/config/typeorm.config.ts \
    migration:generate src/database/migrations/${migration_name}