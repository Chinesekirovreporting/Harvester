class daoyu:

    def __init__(self):
        self.arr = [[1, 1, 1, 0],
               [0, 1, 0, 0],
               [1, 0, 1, 0],
               [0, 0, 0, 1]]
        self.landSign = 0
        self.landDic = {}
        for n in range(len(self.arr)):
            for m in range(len(self.arr[n])):
                if self.arr[n][m] == 1 and (n, m) not in self.landDic:
                    #hasNearLand = self.findLand((n,m))
                    #if hasNearLand == False:
                    self.createLand(n,m)

        landSigns = []
        for key in self.landDic:
            if self.landDic[key] not in landSigns:
                landSigns.append(self.landDic[key])
        print(len(landSigns))

    def createLand(self,n,m):
        if n == 3:
            print("debug")
        self.landSign = self.landSign + 1
        newLandSign = self.landSign
        self.landDic[(n,m)] = newLandSign
        # 连接附近岛屿
        # 连接四方

            # 处理空值地块
        #if self.landDic[(n - 1, m)] is None and self.arr[n - 1][m] == 1:
        #    self.landDic[(n - 1, m)] = newLandSign
        #if self.landDic[(n + 1, m)] is None and self.arr[n + 1][m] == 1:
        #    self.landDic[(n + 1, m)] = newLandSign
        #if self.landDic[(n, m - 1)] is None and self.arr[n][m - 1] == 1:
        #    self.landDic[(n, m - 1)] = newLandSign
        #if self.landDic[(n, m + 1)] is None and self.arr[n][m + 1] == 1:
        #    self.landDic[(n, m + 1)] = newLandSign

        # 同化 有标识，向下合并
        if (n - 1, m) in self.landDic and self.landDic[(n - 1, m)] != self.landDic[(n,m)]:
            self.conpareLand(n - 1,m,n,m)
        if (n + 1, m) in self.landDic and self.landDic[(n + 1, m)] != self.landDic[(n, m)]:
            self.conpareLand(n + 1, m, n, m)
        if (n , m-1) in self.landDic and self.landDic[(n , m-1)] != self.landDic[(n, m)]:
            self.conpareLand(n , m-1, n, m)
        if (n , m+1) in self.landDic and self.landDic[(n , m+1)] != self.landDic[(n, m)]:
            self.conpareLand(n , m+1, n, m)

    def conpareLand(self, othern, otherm, myn, mym):
        if (othern, otherm) not in self.landDic:
            return
        otherSign = self.landDic[(othern, otherm)]
        mySign = self.landDic[(myn, mym)]
        if otherSign < mySign:
            self.landDic[(myn, mym)] = otherSign
            # 在发散与上下左右
            self.conpareLand(myn-1, mym,myn, mym)
            self.conpareLand(myn+1, mym,myn, mym)
            self.conpareLand(myn, mym-1,myn, mym)
            self.conpareLand(myn, mym+1,myn, mym)
        elif otherSign > mySign:
            self.landDic[(othern, otherm)] = mySign
            # 在发散与上下左右
            self.conpareLand(othern-1, otherm, othern, otherm)
            self.conpareLand(othern+1, otherm, othern, otherm)
            self.conpareLand(othern, otherm-1, othern, otherm)
            self.conpareLand(othern, otherm+1, othern, otherm)



