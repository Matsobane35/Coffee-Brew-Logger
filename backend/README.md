Database table-creating command:

CREATE TABLE coffee_brews(
    &emsp;&emsp;brew_id INTEGER PRIMARY KEY,  
    &emsp;&emsp;beans_used TEXT,  
    &emsp;&emsp;brewing_method TEXT,  
    &emsp;&emsp;coffee_content TEXT,  
    &emsp;&emsp;water_content TEXT,  
    &emsp;&emsp;rating INTEGER,  
    &emsp;&emsp;notes TEXT,
    &emsp;&emsp;CONSTRAINT check_rating CHECK (rating >=0 AND rating <=5)
)