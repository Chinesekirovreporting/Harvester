
class bfs:

    inputDotime = None
    inputm = None
    inputn = None
    inputSourcem = None

    mapDic = {}
    myPos = None
    myLastPos1 = None # 实时计算
    myNextPos = None

    baoXiangsDic = {}   # key:number, value:tuple

    steps = -1

    def __init__(self):
        self.calculate()

    def calculate(self):
        print("开始")
        self.steps = -1
        # 输入重复次数
        for _ in range(self.getInputTime()):
            # 输入数据并整理结构
            self.getInput()
            self.steps = 0
            # 查找
            self.collectTreasures()
            # 打印结果
            print(self.steps)

    # 执行次数
    def getInputTime(self):
        self.inputDotime = int(input())
        return self.inputDotime


    # 初始化数据
    def getInput(self):
        for _ in range(self.inputDotime):
            self.inputm, self.inputn = input().split()
            for n in range(int(self.inputn)):
                print("输入元数据")
                self.inputSourcem = list(input())
                for m in range(int(self.inputm)):
                    self.mapDic[(m,n)] = self.inputSourcem[m]
                    if self.inputSourcem[m] == "*":
                        self.myPos = (m,n)
                    if self.inputSourcem[m] != "*" and self.inputSourcem[m] != "#" and self.inputSourcem[m] != ".":
                        self.baoXiangsDic[self.inputSourcem[m]] = (m,n)

    def collectTreasures(self):
        print("执行collectTreasures")
        #1. 计算未收集宝箱距离，并取出k号宝箱，
        minManDis = 999
        minDisBaoxiangKey = None
        minDisBaoxiangPos = None
        # 如果没有宝箱 直接返回
        if len(self.baoXiangsDic) <= 0:
            return
        for key in sorted(self.baoXiangsDic):
            calManDis = self.calcuEzManDis(self.myPos, self.baoXiangsDic[key])
            if calManDis < minManDis:
                minManDis = calManDis
                minDisBaoxiangKey = key
                minDisBaoxiangPos = self.baoXiangsDic[key]
        # 尝试往宝箱最近的方向移动一步。如果移动乐观，重复此动作- 如果移动不乐观，返回失败 step为-1
        if minDisBaoxiangPos != None and self.moveToTreasure(self.myPos, minDisBaoxiangPos, minDisBaoxiangKey) == True:
            self.collectTreasures()
        else:
            self.steps = -1

    def calcuEzManDis(self, myPos, treasurePos):
        x = myPos[0] - treasurePos[0]
        x = abs(x)
        y = myPos[1] - treasurePos[1]
        y = abs(y)
        return x + y

    def notInList(self, list,value):
        print("TO DO")

    def calumanDis(self, myPos, treasurePos):
        if treasurePos == (4,4):
            print("重点观看")
        visitPos = []
        step = 0
        stepList = []
        stepList.append((myPos[0], myPos[1], 0))
        while len(stepList) > 0:
            pos = stepList.pop(0)
            if self.notInList(visitPos, pos):
                visitPos.append(pos)
            step = pos[2]
            if self.canMove((pos[0], pos[1] - 1)) and (pos[0], pos[1] - 1) not in visitPos:
                if (pos[0], pos[1] - 1,pos[2] + 1) not in stepList:
                    self.notInList(stepList, (pos[0], pos[1] - 1))# TO DO
                    stepList.append((pos[0], pos[1] - 1,pos[2] + 1))
            if self.canMove((pos[0], pos[1] + 1)) and (pos[0], pos[1] + 1) not in visitPos:
                if (pos[0], pos[1] + 1,pos[2] + 1) not in stepList:
                    stepList.append((pos[0], pos[1] + 1,pos[2] + 1))
            if self.canMove((pos[0] - 1, pos[1])) and (pos[0]- 1, pos[1]) not in visitPos:
                if (pos[0] - 1, pos[1], pos[2] + 1) not in stepList:
                    stepList.append((pos[0] - 1, pos[1], pos[2] + 1))
            if self.canMove((pos[0]+1, pos[1] )) and (pos[0]+ 1, pos[1]) not in visitPos:
                if (pos[0] + 1, pos[1], pos[2] + 1) not in stepList:
                    stepList.append((pos[0]+1, pos[1], pos[2] + 1))
            #if stepList.index(treasurePos) != -1:
            if treasurePos == (pos[0],pos[1]):
                return pos[2]
        return -1

    def canMove(self, pos):
        return self.mapDic.get(pos) is not None and self.mapDic[pos] != "#" and self.mapDic[pos] != "*"

    def moveToTreasure(self, myPos, treasurePos, treasurePosKey):
        print("执行moveToTreasure",myPos, treasurePos)
        # 判断位置重叠 采摘
        if myPos == treasurePos:
            print("采摘")
            del self.baoXiangsDic[treasurePosKey]
            self.steps = self.steps
            self.myLastPos1 = None
            self.myNextPos = None
            return True
        # 判断没有路径 不能行走
        curDis = self.calumanDis(self.myPos, treasurePos)
        print("执行moveToTreasure距离检测", curDis)
        if curDis == -1:
            return False
        else:
            m = self.myPos[0]
            n = self.myPos[1]
            # 尝试上下左右走动
            if self.canMove((m, n - 1)) and self.calumanDis((m, n - 1), treasurePos) < curDis:
                self.myNextPos = (m, n - 1)
            elif self.canMove((m, n + 1)) and self.calumanDis((m, n + 1), treasurePos) < curDis:
                self.myNextPos = (m, n + 1)
            elif self.canMove((m - 1, n)) and self.calumanDis((m - 1, n), treasurePos) < curDis:
                self.myNextPos = (m - 1, n)
            elif self.canMove((m + 1, n)) and self.calumanDis((m + 1, n), treasurePos) < curDis:
                self.myNextPos = (m + 1, n)
            elif self.canMove((m, n - 1)):
                self.myNextPos = (m, n - 1)
            elif self.canMove((m, n + 1)):
                self.myNextPos = (m, n + 1)
            elif self.canMove((m - 1, n)):
                self.myNextPos = (m - 1, n)
            elif self.canMove((m + 1, n)):
                self.myNextPos = (m + 1, n)


            print("执行moveToTreasure行走计划", self.myNextPos)
            # 判断是否往回走
            if self.myLastPos1 is not None and self.myLastPos1 == self.myNextPos:
                return False
            # 可以走且距离更短，调整一格
            if self.calumanDis(self.myNextPos, treasurePos) < self.calumanDis(self.myPos, treasurePos):
                self.myLastPos1 = self.myPos
                self.myPos = self.myNextPos
                self.steps = self.steps + 1
                return True