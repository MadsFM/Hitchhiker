insert into Galaxies (Id, Name, Description, ImagePath)
VALUES 
    (1, "Astralis Prime", "A sprawling galaxy known for its radiant nebulae and ancient star systems. It is home to diverse life forms, from highly advanced civilizations to mysterious, uncharted regions where explorers frequently disappear.", "astralisp.webp"),
    (2, "Orthenis Nebula", "Its core consists of a black hole surrounded by colorful stellar debris, and its star systems are scattered far apart, making travel between them long and dangerous. The galaxy is home to ancient, isolated civilizations with mysterious technologies and knowledge.", "Orthenis.webp");

insert into Planets (Id, Name, Desciption, DateVisited, TimesVisited, Population, GalaxyId)
VALUES 
    (1, "Kaldris", "A cold, icy world in a remote galaxy, rich with hidden resources. Kaldris is sparsely populated, with its people living in massive underground cities, sheltered from the freezing temperatures above. They mine deep into the ice, harvesting valuable materials.", null, 0, 300000000, 1), 
    (2, "Zephyria", "A planet with vast windswept landscapes, evoking mystery and beauty.", null, 0, 3200000000, 1),
    (3, "Nyxara", "A dark, distant world, named after the goddess of night.", null, 0, 800000000, 1),
    (4, "Aethoria", "A majestic planet, abundant with ethereal energy.", null, 0, 15000000000, 1),
    (5, "Valkara", "A rugged, mountainous world, known for its harsh environments.", null, o, 500000000, 1),
    (6, "Eldathis", "A tranquil, water-rich planet with lush, alien life forms.", null, 0, 12000000000, 1),
    (7, "Syrenthis", "A planet surrounded by rings of colorful gases, glowing like a nebula.", null, 0, 4500000000, 1),
    (8, "Pyrron", "A fiery, volcanic planet that could be the result of a collapsed star''s energy.", null, 0, 1800000000, 1),
    (9, "Xalora", "A mysterious and advanced civilization thrives here in this glittering world.", null, 0, 25000000000, 1),
    (10, "Elios", "A bright, sun-kissed planet orbiting close to a vibrant, young star.", null, 0, 9000000000, 1),
    (11, "Drakthora", "A planet with dark, stormy skies and constant electrical storms. Its inhabitants have evolved to harness lightning for energy, living in massive storm-resistant domes.", null, 0, 1200000000, 2),
    (12, "Lyrathis", "Known for its vast, shimmering crystal plains, Lyrathis is home to advanced energy-focused civilizations that use the planet''s unique crystals for their technology.", null, 0, 7000000000, 2),
    (13, "Marethos", "A desert planet with towering sand dunes and nomadic tribes who live in moving fortress cities, traversing the landscape in search of water and rare minerals.", null, 0, 4700000000, 2),
    (14, "Calystria", "A lush jungle planet filled with towering alien flora and diverse fauna. The people of Calystria live in harmony with nature, building bio-architecture cities within the jungle canopies.", null, 0, 9500000000, 2),
    (15, "Thaloria", "An ocean world where the majority of its population lives in underwater cities, using advanced submarine technology to thrive in the deep-sea environments.", null, 0, 2300000000, 2),
    (16, "Veridion", "A highly industrialized planet known for its vast factories and production facilities. Veridion is a key economic center in Orthenis Nebula, with towering megacities and sprawling industrial landscapes.", null, 0, 13000000000, 2);

