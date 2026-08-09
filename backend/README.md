Database table-creating command:

```sql
CREATE TABLE coffee_brews(
    brew_id INTEGER PRIMARY KEY, 
    beans_used TEXT NOT NULL, 
    brewing_method TEXT NOT NULL, 
    coffee_content TEXT NOT NULL, 
    water_content TEXT NOT NULL, 
    rating INTEGER, 
    notes TEXT, 
    CONSTRAINT check_rating CHECK (rating >=0 AND rating <=5)
);
```