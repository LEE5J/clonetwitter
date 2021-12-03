import sys
if __name__ =="__main__"
sys.argv[1]=

def oneseq(filepath):
    seq = ''
    for line in open(filepath):
        seq+=line.rstrip()
    return(seq)
sequence = oneseq(sys.argv[1])
print(sequence,str(len(sequence)))

a=0
for i in range(0, len(sequence)):
    if str(sequence[i])=='c' or  str(sequence[i])=='C':
        a+=1
    else:
        if int(a) != 0:
            print(a, end=' ')
            a=0
if int(a) != 0:
    print(a, end=' ')
    a=0