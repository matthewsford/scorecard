using System;
using System.Numerics;
using System.Security.Cryptography;

namespace MatthewFordUs.Srp
{
    public class SRPServer : Srp
    {
        public SRPServer(GroupParameter group, HashAlgorithm hashAlgorithm) :
            base(group, hashAlgorithm) { }

        /// <summary>
        /// B = k*v + g^b % N
        /// </summary>
        /// <param name="v"></param>
        /// <param name="k"></param>
        /// <param name="b"></param>
        /// <returns></returns>
        public BigInteger ComputeB(BigInteger v, BigInteger k, BigInteger b) {
            return (k * v + BigInteger.ModPow(Group.g_Big, b, Group.N_Big)) % Group.N_Big;
        }

        /// <summary>
        /// <premaster secret> = (A * v^u) ^ b % N
        /// </summary>
        /// <param name="A"></param>
        /// <param name="v"></param>
        /// <param name="u"></param>
        /// <param name="b"></param>
        /// <returns></returns>
        public BigInteger ComputeS(BigInteger A, BigInteger v, BigInteger u, BigInteger b)
        {
            if (A % Group.N_Big == BigInteger.Zero) {
                throw new Exception("A mod N == 0");
            }

            return BigInteger.ModPow(A * BigInteger.ModPow(v, u, Group.N_Big), b, Group.N_Big);
        }
    }
}
