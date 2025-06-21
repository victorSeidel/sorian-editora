USE sorian_db;

-- DIMENSÕES --
INSERT INTO dimensoes (id, largura_min, largura_max, altura_min, altura_max) VALUES (1, 15.00, 16.00, 15.00, 23.00);
INSERT INTO dimensoes (id, largura_min, largura_max, altura_min, altura_max) VALUES (2, 20.00, 21.00, 20.00, 29.70);

-- TAXAS --
SELECT * FROM taxas;
INSERT INTO taxas (id, custo_editorial, cartao, imposto) VALUES (1, 700.00, 9.00, 4.00);

-- PRODUTOS --
INSERT INTO produtos (id, nome, tipo, classe) VALUES
(1, 'POLEN/AVENA 80 OFFSET 90 GRS', 'PB', 'Página'), (2, 'POLEN/AVENA 80 OFFSET 90 GRS', 'COLOR', 'Página'),
(3, 'COUCHE FOSCO 115 GRS', 'PB', 'Página'), (4, 'COUCHE FOSCO 115 GRS', 'COLOR', 'Página'),
(5, 'CAPA SUP250 C/ LAM', '4X0', 'Capa');

-- PACOTES -- 
-- POLEN/AVENA 80 OFFSET 90 GRS --
INSERT INTO pacotes (produto_id, dimensao_id, quantidade_minima, quantidade_maxima, preco) VALUES 
(1, 1, 4, 12, 0.064), (2, 1, 4, 12, 0.247),
(1, 2, 4, 12, 0.138), (2, 2, 4, 12, 0.429),
(1, 1, 16, 48, 0.060), (2, 1, 16, 48, 0.238),
(1, 2, 16, 48, 0.129), (2, 2, 16, 48, 0.413),
(1, 1, 52, 112, 0.056), (2, 1, 52, 112, 0.228),
(1, 2, 52, 112, 0.121), (2, 2, 52, 112, 0.396),
(1, 1, 116, 204, 0.054), (2, 1, 116, 204, 0.219),
(1, 2, 116, 204, 0.116), (2, 2, 116, 204, 0.380),
(1, 1, 208, 500, 0.051), (2, 1, 208, 500, 0.190),
(1, 2, 208, 500, 0.110), (2, 2, 208, 500, 0.330);

-- COUCHE FOSCO 115 GRS --
INSERT INTO pacotes (produto_id, dimensao_id, quantidade_minima, quantidade_maxima, preco) VALUES 
(3, 1, 4, 12, 0.075), (4, 1, 4, 12, 0.260),
(3, 2, 4, 12, 0.156), (4, 2, 4, 12, 0.455),
(3, 1, 16, 48, 0.070), (4, 1, 16, 48, 0.250),
(3, 2, 16, 48, 0.146), (4, 2, 16, 48, 0.438),
(3, 1, 52, 112, 0.066), (4, 1, 52, 112, 0.240),
(3, 2, 52, 112, 0.138), (4, 2, 52, 112, 0.420),
(3, 1, 116, 204, 0.063), (4, 1, 116, 204, 0.230),
(3, 2, 116, 204, 0.131), (4, 2, 116, 204, 0.403),
(3, 1, 208, 500, 0.060), (4, 1, 208, 500, 0.200),
(3, 2, 208, 500, 0.125), (4, 2, 208, 500, 0.350);

-- CAPA SUP250 C/ LAM --
INSERT INTO pacotes (produto_id, dimensao_id, quantidade_minima, quantidade_maxima, preco) VALUES 
(5, 1, 4, 12, 2.760), (5, 2, 4, 12, 4.083),
(5, 1, 16, 48, 2.652), (5, 2, 16, 48, 3.923),
(5, 1, 52, 112, 2.520), (5, 2, 52, 112, 3.728),
(5, 1, 116, 204, 2.472), (5, 2, 116, 204, 3.657),
(5, 1, 208, 500, 2.400), (5, 2, 208, 500, 3.550);

-- PLANOS --
INSERT INTO planos (id, nome, quantidade_autor, lucro) VALUES (1, 'PLANO A', 20, 1000.000);
INSERT INTO planos (id, nome, quantidade_autor, lucro) VALUES (2, 'PLANO B', 40, 1500.000);
INSERT INTO planos (id, nome, quantidade_autor, lucro) VALUES (3, 'PLANO C', 60, 2000.000);
INSERT INTO planos (id, nome, quantidade_autor, lucro) VALUES (4, 'PLANO D', 80, 2500.000);