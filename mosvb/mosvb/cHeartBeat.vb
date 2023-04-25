Imports System
Imports System.Collections.Generic
Imports System.Text
Imports System.Xml
Imports System.Xml.Serialization

Namespace mosprotocol
    <XmlRoot("heartbeat")>
    Public Class cHeartBeat
        Private _time As DateTime

        Public Property time As DateTime
            Get
                Return _time
            End Get
            Set(ByVal value As DateTime)
                _time = value
            End Set
        End Property
    End Class
End Namespace
