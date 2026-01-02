class test1:
    # 提取两个字符串的数字到一个数组中，并将他们排序好
    str1 = "asdf111"
    list1 = []

    def __init__(self):
        for char in self.str1:
            if char.isdigit():
                self.list1.append(char)
        self.list1.sort()
