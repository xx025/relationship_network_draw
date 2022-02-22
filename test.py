from python_src.Register import register

test = register(email='draw-send@yandex.com', password='11223344')

print(test.get_code())