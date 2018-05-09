using System;
using System.Collections.Generic;
using System.Numerics;
using System.Linq;

namespace MatthewFordUs.Srp
{
    public static class UtilExtensions
    {
        public static bool CheckEquals(this IEnumerable<byte> source, IEnumerable<byte> target)
        {
            return source.SequenceEqual(target);
        }

        public static byte[] ToByteArray(this string hexString)
        {
            hexString = hexString.Replace(" ", "");
            var NumberChars = hexString.Length;
            var bytes = new byte[NumberChars / 2];
            for (var i = 0; i < NumberChars; i += 2)
                bytes[i / 2] = Convert.ToByte(hexString.Substring(i, 2), 16);
            return bytes;
        }

        public static BigInteger ToBigInteger(this IEnumerable<byte> data)
        {
            return new BigInteger(data.Reverse().Concat(new byte[] { 0 }).ToArray());
        }

        public static byte[] ToBytes(this BigInteger value)
        {
            var valueArray = value.ToByteArray();

            if (valueArray[valueArray.Length - 1] != 0)
            {
                Array.Reverse(valueArray);
                return valueArray;
            }

            var result = new byte[valueArray.Length - 1];
            Array.Copy(valueArray, result, valueArray.Length - 1);
            Array.Reverse(result);
            return result;
        }
    }
}
